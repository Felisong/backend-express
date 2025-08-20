"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
// here i will put any extra logic i dont want to put in routes
const blockedIPSModel_1 = __importDefault(require("./models/blockedIPSModel"));
const custom_log_1 = require("./utils/custom-log");
class Middleware {
    handleBots(ipAddress, dateNow) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // counter
                let currentStrikeNum = 0;
                // API return msg
                let returnMessage = "";
                // new values for the new or currently blocked IP
                let newTierMessage = "";
                let newDates = [];
                // this will handle the new dates array to return
                const arrangeNewDates = (dates) => {
                    newDates = [dateNow, ...dates];
                    if (dates.length >= 3) {
                        // sort to get the oldest one to the end of the array
                        dates.sort((a, b) => {
                            return new Date(a).getTime() - new Date(b).getTime();
                        });
                        // pop out the oldest date, push in the newest
                        dates.pop();
                    }
                };
                // if this Ip is already in the DB
                const exists = yield blockedIPSModel_1.default.findOne({ ipAddress: ipAddress });
                if (exists) {
                    currentStrikeNum = exists.dates.length + 1;
                    switch (currentStrikeNum) {
                        case 3:
                            returnMessage = `Strike 3: IP ${ipAddress} is permanently banned`;
                            newTierMessage = "permanently banned";
                            arrangeNewDates(exists.dates);
                            break;
                        case 2:
                            returnMessage = `Strike 2: IP ${ipAddress} has 1 hour timeout`;
                            newTierMessage = "1 hour timeout";
                            arrangeNewDates(exists.dates);
                            break;
                        default:
                            returnMessage = `Error, no or too many strikes. IP ${ipAddress} has been permanently banned.`;
                            newTierMessage = "permanently banned";
                            arrangeNewDates(exists.dates);
                    }
                }
                else {
                    // first offense
                    returnMessage = `Strike 1: IP ${ipAddress} has a 5 minute timeout`;
                    newTierMessage = "5 minute timeout";
                    arrangeNewDates([dateNow]);
                }
                const levelUpPunishment = exists
                    ? yield blockedIPSModel_1.default.updateOne({ ipAddress: ipAddress }, { $set: { currentStrike: newTierMessage, dates: newDates } })
                    : yield blockedIPSModel_1.default.insertOne({
                        ipAddress: ipAddress,
                        currentStrike: newTierMessage,
                        dates: newDates,
                    });
                console.log(`i just want to see what this looks like`, levelUpPunishment);
                return {
                    success: true,
                    message: returnMessage,
                };
            }
            catch (err) {
                custom_log_1.log.error(err.message || `Failed in middleware handleBots`);
                return { success: true, message: err.message || "Unable to handle bot" };
            }
        });
    }
}
exports.Middleware = Middleware;
