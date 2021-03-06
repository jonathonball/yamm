# Draft API

## StreamPlayer
Provides methods to control an external media player process such as mplayer, mpv, or vlc.

### Properties
* `playback` `boolean` is playback happening right now
* `timeIndex` `number` position in stream in seconds
* `timeTotal` `number` total number of seconds in stream
* `commandName` `string` properly styled name of executable
* `command` `string` full path to an executable
* `playerInstance` `mixed` link to child process
* `defaultArgs` `array` default params to send to child process

### Methods
* `spawn()` loads the playerInstance
* `openStream(resource)` load resource
* `play()` set playback to true
* `pause()` set playback to false
* `closeStream()` set playback to false and unload resource
* `seekToTimeIndex(seconds)` seek to seconds into stream
* `seekToPercent(percent)` seek to percent into stream
* `seekByInterval(seconds)` seek n seconds ahead or behind
* `parseStreamOutput(rawOutput)` parse stream output
* `update(data)` update class properties
* `command(command, args)` send arbitrary commands to playerInstance

### Events
* `time` parses stream output and emits data about most of the class properties
* `stop_eof` emits when stream runs out of data
* `stop_error` emits when stream errors
* `stop_user` emits when commanded to stop
* `error` emits an error

## StreamManager
Loads and manages the appropriate StreamPlayer class

### Properties
* `streamPlayer` `StreamPlayer` an instance of the stream playing class
* `status` `array` collection of required properties from `StreamPlayer`

### Methods
* `constructor(defaults)`
  * loads an instance of `StreamPlayer`
  * checks for required properties
  * checks for required methods
  * calls `spawn()` on `StreamPlayer`
* `loadPlayer(name)`
* `inspectPlayerProperties()`
* `inspectPlayerMethods()`
* `getStatus()` collects required properties and returns them

### Events
* Rebroadcast all required events from `StreamPlayer`

## YTHelper
Methods to assist in using YouTube-dl
### Properties
### Methods
* `getStreams()`
* `get`
### Events

## ExampleComponent
### Properties
### Methods
### Events
