import { Component, inject, OnInit, OnDestroy } from '@angular/core';
// import OT, { Session, Publisher, Stream } from '@opentok/client';
import * as OT from '@opentok/client';
import { VideoService } from '../../service/video/video.service';

@Component({
  selector: 'app-video-call',
  standalone: true,
  imports: [],
  templateUrl: './videochat.component.html',
  styleUrls: ['./videochat.component.css']
})
export class VideoCallComponent implements OnInit, OnDestroy {
private appId = '9a354c64-8458-4be0-ae28-b671f428f72b';
sessionId!: string;
token!: string;
session!: OT.Session;
publisher!: OT.Publisher;
screenPublisher!: OT.Publisher;
isCallActive: boolean = false;
videoService = inject(VideoService);

ngOnInit() {
  // Fetch session ID and token from the backend
  this.videoService.getSessionId().subscribe(({ sessionId }) => {
    this.sessionId = sessionId;
    console.log(sessionId);

    this.videoService.getToken(sessionId).subscribe(({ token }) => {
      this.token = token;
      console.log(token);
    });
  });
}

startCall() {
  if (!this.sessionId || !this.token) {
    alert('Session ID and token are required');
    return;
  }
  this.isCallActive = true;

  // Initialize the OpenTok session
  this.session = OT.initSession(this.appId, this.sessionId);

  // Subscribe to streams created in the session
  this.session.on('streamCreated', (event: any) => {
    this.session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%',
    });
  });

  // Connect to the session using the token
  this.session.connect(this.token, (err: any) => {
    if (err) {
      console.error('Failed to connect:', err);
      return;
    }

    // Publish the user's camera video stream
    this.publisher = OT.initPublisher('publisher', {
      insertMode: 'append',
      width: '100%',
      height: '100%',
    });
    this.session.publish(this.publisher);
  });
}

endCall() {
  if (this.isCallActive) {
    this.session.disconnect();
    this.isCallActive = false;
  }
}

shareScreen() {
  // Initialize a screen-sharing publisher
  OT.checkScreenSharingCapability((response: any) => {
    if (!response.supported || response.extensionRegistered === false) {
      alert('Screen sharing is not supported in your browser.');
      return;
    }

    this.screenPublisher = OT.initPublisher(
      'screenPublisher',
      {
        videoSource: 'screen',
        insertMode: 'append',
        width: '100%',
        height: '100%',
      },
      (err: any) => {
        if (err) {
          console.error('Screen sharing failed:', err);
          return;
        }

        this.session.publish(this.screenPublisher);
      }
    );
  });
}

stopScreenSharing() {
  if (this.screenPublisher) {
    this.session.unpublish(this.screenPublisher);
  }
}

ngOnDestroy() {
  if (this.isCallActive) {
    this.endCall();
  }
}
}
