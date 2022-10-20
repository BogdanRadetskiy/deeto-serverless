import fetch from 'node-fetch';
import { ZoomCreateMeetingResponse, ZoomOauthResponse } from '@modules/zoom/types';

import { env } from '@shared/config/config';
import { ZoomMeetingStatus } from '@shared/enums/zoom';

export class ZoomService {
  /**
   * get access token for ''root'' user https://marketplace.zoom.us/docs/api-reference/using-zoom-apis/#server-to-server-authentication
   * */
  static async getAccessToken(): Promise<ZoomOauthResponse> {
    const authorizationHeader = `${env.ZOOM_CLIENT_ID}:${env.ZOOM_CLIENT_SECRET}`;
    const authorizationHeaderBase64Encoded = Buffer.from(authorizationHeader).toString('base64');

    const params = new URLSearchParams({
      grant_type: 'account_credentials',
      account_id: env.ZOOM_ROOT_USER,
    });
    const url = `https://zoom.us/oauth/token?${params}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + authorizationHeaderBase64Encoded,
      },
    });

    return (await response.json()) as ZoomOauthResponse;
  }

  /**
   * https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/meetingCreate
   * */
  static async createMeeting(accessToken: string, startTime: string): Promise<ZoomCreateMeetingResponse> {
    const url = `https://api.zoom.us/v2/users/S_HyWV3YSa-Mku1mUwKHoQ/meetings`;

    const body = {
      start_time: startTime,
      settings: {
        join_before_host: true,
        auto_recording: 'cloud',
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    return (await response.json()) as ZoomCreateMeetingResponse;
  }

  /**
   * https://marketplace.zoom.us/docs/api-reference/zoom-api/methods/#operation/meetingStatus
   * */
  static async updateMeetingStatus(accessToken, meetingId, status: ZoomMeetingStatus) {
    const url = `https://api.zoom.us/v2/meetings/${meetingId}/status`;

    const body = {
      action: status,
    };

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.status === 204) {
      return { res: true };
    } else {
      throw new Error(response.statusText);
    }
  }
}
