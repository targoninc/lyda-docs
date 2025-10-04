# Audio

On Lyda, we serve all audio files in [mp3 format](https://en.wikipedia.org/wiki/MP3).
The available bitrates are: 92kbps, 128kbps and 320kbps.

We use [ffmpeg](https://ffmpeg.org/) for converting uploaded files to the target format.
If you encounter any issues uploading files, we recommend trying to run a local conversion of the file (replace "%file%" with the actual path to the file on your system):

```bash
ffmpeg -probesize 50M -analyzeduration 100M -i %file% -ab 320k
```

If that works, the issue might be with analyzing the loudness data of the file:
```bash
ffmpeg -i %file% -af ebur128
```
