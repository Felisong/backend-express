// here i will put any extra logic i dont want to put in routes
import BlockedIps from "./models/blockedIPSModel";
import {
  BlockedIpsModel,
  StandardResponse,
} from "../../frontend-react/app/utils/interface";
import { log } from "./utils/custom-log";

export class Middleware {
  async handleBots(
    ipAddress: string | undefined,
    dateNow: string
  ): Promise<StandardResponse> {
    try {
      // counter
      let currentStrikeNum: number = 0;
      // API return msg
      let returnMessage: string = "";
      // new values for the new or currently blocked IP
      let newTierMessage: string = "";
      let newDates: string[] = [];
      // this will handle the new dates array to return
      const arrangeNewDates = (dates: string[]) => {
        newDates = [dateNow, ...dates];
        if (dates.length >= 3) {
          // sort to get the oldest one to the end of the array
          dates.sort((a: string, b: string) => {
            return new Date(a).getTime() - new Date(b).getTime();
          });
          // pop out the oldest date, push in the newest
          dates.pop();
        }
      };
      // if this Ip is already in the DB
      const exists = await BlockedIps.findOne({ ipAddress: ipAddress });

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
      } else {
        // first offense
        returnMessage = `Strike 1: IP ${ipAddress} has a 5 minute timeout`;
        newTierMessage = "5 minute timeout";
        arrangeNewDates([dateNow]);
      }
      const levelUpPunishment = exists
        ? await BlockedIps.updateOne(
            { ipAddress: ipAddress },
            { $set: { currentStrike: newTierMessage, dates: newDates } }
          )
        : await BlockedIps.insertOne({
            ipAddress: ipAddress,
            currentStrike: newTierMessage,
            dates: newDates,
          });
      console.log(`i just want to see what this looks like`, levelUpPunishment);
      return {
        success: true,
        message: returnMessage,
      };
    } catch (err: any) {
      log.error(err.message || `Failed in middleware handleBots`);
      return { success: true, message: err.message || "Unable to handle bot" };
    }
  }
}
