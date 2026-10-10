# Audio

On Lyda, we stream all audio in [Ogg/Opus format](https://en.wikipedia.org/wiki/Ogg).
The available bitrates are: 64 kbps, 128 kbps and 192 kbps.

We use [ffmpeg](https://ffmpeg.org/) for converting uploaded files to the target format.
If you encounter any issues uploading files, we recommend trying to run a local conversion of the file (replace "%file%" with the actual path to the file on your system):

```bash
ffmpeg -probesize 50M -analyzeduration 100M -i %file% -c:a libopus -ab 192k
```

If that works, the issue might be with analyzing the loudness data of the file:
```bash
ffmpeg -i %file% -af ebur128
```
