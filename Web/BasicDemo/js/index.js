'use strict';

let rtc = new RtcClient({
  config,
  streamOptions,
  handleUserPublishStream,
  handleUserUnpublishStream,
  handleUserStartVideoCapture,
  handleUserStopVideoCapture,
  handleUserJoin,
  handleUserLeave,
  handleEventError,
});

/**
 * hide the voice and mic control pannel
 */
$('.player').hide();
$('#control').hide();
$('#room-id-text').text('');
$('#user-id-text').text('');
$('#header-version').text(`RTC版本 v${rtc.SDKVERSION}`);
checkRoomIdAndUserId('room-id');
checkRoomIdAndUserId('user-id');
/**
 *
 * @param {String} type video / mic
 * @param {Boolean} statusTag
 * @param {String} offIcon
 * @param {String} onIcon
 */
const changeMicOrVideoIconUrl = (type, statusTag, offIconUrl, onIconUrl) => {
  let iconSrc = statusTag ? onIconUrl : offIconUrl;

  $(`#control-${type} img`).attr('src', `${iconSrc}`);
};

/*
 * When a user clicks Join or Leave in the HTML form, this procedure gathers the information
 * entered in the form and calls join asynchronously. The UI is updated to match the options entered
 * by the user.
 */

$('#submit').on('click', async () => {
  if (checkReg('room-id') || checkReg('user-id')) {
    return;
  }
  config.roomId = $('#room-id').val();
  config.uid = $('#user-id').val();
  $('#control').show();
  $('.player').show();
  $('#pannel').hide();
  try {
    rtc.bindEngineEvents();
    /*
     * before join a room, you should create a room,then you can join it with `engine.join(token,roomId,uid, onSuccessFunc, onFailFunc)`
     */

    await rtc.join((config.token || {})[config.uid], config.roomId, config.uid);
    console.log('join room ');
    $('#header-version').text(`${config.roomId}`);
    $('#local-player').show();
    $('#local-player-name').text(`${config.uid}`);
    rtc.createLocalStream();
  } catch (err) {
    $('#control').hide();
    $('#pannel').show();
    console.log(err);
  }
});

/**
 * click change the state of mic
 */
$('#control-mic').click(() => {
  actionChangeMicState();
});

/**
 * click change the state of video
 */
$('#control-video').click(() => {
  actionChangeVideoState();
});

/*
 * Called when a user clicks Leave in order to exit a room.
 */
$('#leave').click(() => {
  actionToLeave();
});

/**
 * When you reload page you can make leave action and keep the next load is fine
 */
$(window).on('beforeunload unload', () => {
  actionToLeave();
});

/*---------------------- action handler start --------------------*/
/**
 * change the micro state
 */
const actionChangeMicState = async () => {
  isMicOn = !isMicOn;
  await rtc.changeAudioState(isMicOn);
  // toggle the mic icon url
  changeMicOrVideoIconUrl('mic', isMicOn, OFFMICICON, ONMICICON);
};
/**
 * change the video state
 */
const actionChangeVideoState = async () => {
  isVideoOn = !isVideoOn;
  await rtc.changeVideoState(isVideoOn);
  // toggle the video icon url
  changeMicOrVideoIconUrl('video', isVideoOn, OFFVIDEOICON, ONVIDEOICON);
};

/*
 * leave the room and clear the wrapper dom of `engine` and info
 */
const actionToLeave = async () => {
  $('#header-version').text(`RTC版本 v${rtc.SDKVERSION}`);
  $('.remote-player').remove();
  // clear the dom
  $('#user-id').val('');
  $('#room-id').val('');
  $('#control').hide();
  $('.player').hide();
  $('#pannel').show();

  isMicOn = true;
  changeMicOrVideoIconUrl('mic', isMicOn, OFFMICICON, ONMICICON);
  isVideoOn = true;
  changeMicOrVideoIconUrl('video', isVideoOn, OFFVIDEOICON, ONVIDEOICON);

  // off the event
  rtc.removeEventListener();
  // leave the room
  await rtc.leave();
};
/*---------------------- action handler end --------------------*/

/*------------------------- common handler start ----------------*/
/*
 *  These procedures use RTC SDK for Web to enable local and remote
 *  users to join and leave a room managed by RTC Platform.
 */
// const engine = VERTC.createEngine(config.appId);
// bindEngineEvents();

function handleUserJoin(e) {
  console.log('handleUserJoin', e);
  const { userInfo } = e;
  const remoteUserId = userInfo.userId;
  const currentLength = $('.player-wrapper').length;
  if (currentLength < 4) {
    const player = $(`
		<div id="player-wrapper-${remoteUserId}" class="player-wrapper remote-player">
		  <p class="player-name">${remoteUserId}</p>
		</div>
	  `);
    $('#player-list').append(player);
  }
}

function handleUserLeave(e) {
  console.log('handleUserLeave', e);
  const { userInfo } = e;
  const remoteUserId = userInfo.userId;
  $(`#player-wrapper-${remoteUserId}`).remove();
}

/**
 * Add a user who has subscribed to the live room to the local interface.
 * @param {*} event
 */
async function handleUserPublishStream(stream) {
  console.log('handleUserPublishStream', stream);
  const { userId, mediaType } = stream;
  const remoteUserId = userId;
  if (mediaType & rtc.MediaType.VIDEO) {
    const player = $(`#player-wrapper-${remoteUserId}`);
    if (player[0]) {
      rtc.setRemoteVideoPlayer(remoteUserId, player[0]);
    }
  }
}

/**
 * Remove the user specified from the room in the local and clear the unused dom
 * @param {*} event
 */
function handleUserUnpublishStream(stream) {
  const { userId, mediaType } = stream;

  if (mediaType & rtc.MediaType.VIDEO) {
    rtc.setRemoteVideoPlayer(userId, undefined);
  }
}
/*------------------------- common handler end ----------------*/

function handleEventError(e) {
  if (e.errorCode === VERTC.ErrorCode.DUPLICATE_LOGIN) {
    actionToLeave();
    alert('你的账号被其他人顶下线了');
  }
}

async function handleUserStartVideoCapture(event) {
  const { userId } = event;
  const player = $(`#player-wrapper-${userId}`);
  if (player[0]) {
    rtc.setRemoteVideoPlayer(userId, player[0]);
  }
}

/**
 * Remove the user specified from the room in the local and clear the unused dom
 * @param {*} event
 */
function handleUserStopVideoCapture(event) {
  const { userId } = event;

  rtc.setRemoteVideoPlayer(userId, undefined);
}
