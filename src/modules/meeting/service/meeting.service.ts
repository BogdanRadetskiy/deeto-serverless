import { Meeting, CallLog, CallStatistics, MeetingStage, AccountContact } from '@shared/models';
import { CreateMeetingType } from '@modules/meeting/types';
import { MeetingStageStatusEnum, MeetingStageTypeEnum } from '@shared/enums';
import { ZoomService } from '@modules/zoom/service/zoom.service';

export class MeetingService {
  static async createMeetingWithStage(data: CreateMeetingType): Promise<any> {
    // create Zoom meeting
    const accessToken = (await ZoomService.getAccessToken()).access_token;
    const zoomMeeting = await ZoomService.createMeeting(accessToken, data.zoomMeetingStartTime);

    data.zoomMeetingJoinUrl = zoomMeeting.join_url;
    data.zoomMeetingId = zoomMeeting.id;
    data.zoomMeetingUUID = zoomMeeting.uuid;

    // create db meting
    const meeting = await Meeting.create(data);

    const createMeetingStage = {
      label: MeetingStageTypeEnum.INVITED,
      status: MeetingStageStatusEnum.NOT_STARTED,
      order: 1, // Q: about order
      meetingId: meeting.meetingId,
    };
    await MeetingStage.create(createMeetingStage);

    return await Meeting.findOne({ where: { meetingId: meeting.meetingId }, include: [{ model: MeetingStage }] });
  }

  static async delete(id: string): Promise<number> {
    return Meeting.destroy({ where: { id } });
  }

  static async getMeetingFullContext(meetingId: string): Promise<Meeting> {
    return Meeting.findOne({
      where: { meetingId: meetingId },
      include: [{ model: MeetingStage }, { model: AccountContact, as: 'referenceContact' }],
    });
  }

  static async getById(id: string): Promise<Meeting> {
    return Meeting.findOne({ where: { id } });
  }

  // TODO create data type
  static async update(data): Promise<Meeting> {
    const meeting = await Meeting.findOne({ where: { id: data.id } });
    return await meeting.save();
    //todo - ask Max
  }

  // TODO move to call statistics service
  static async getCallStatistics(meetingID: string): Promise<CallStatistics> {
    const [callStatistics, created] = await CallStatistics.findOrCreate({
      where: { meetingId: meetingID },
    });

    return callStatistics;
  }

  static async getCallStatisticsLogs(meetingID: string) {
    console.log('and the meeting ID is : ' + meetingID);

    //option 1
    /*
    const meetingObj = await Meeting.findOne({ 
      where: { meetingId: meetingID }, 
      include: [
        {
          model: CallStatistics,
          include: [
            {
              model: CallLog,
            },
          ],
        },
      ],

    });
      
    console.log ("and the meeting object is: " + meetingObj.callStatistics.callLog);
    return meetingObj.callStatistics.callLog;
    */

    // option 2, query
    return await CallLog.findAll({
      include: [
        {
          model: CallStatistics,
          include: [
            {
              model: Meeting,
              where: {
                meetingId: meetingID,
              },
            },
          ],
        },
      ],
    });
  }
}
