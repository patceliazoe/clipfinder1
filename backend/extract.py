import ffmpeg

def extract_clip(source, start, end, output):
    (
        ffmpeg
        .input(source, ss=start, to=end)
        .output(output, vcodec='libx264', crf=28, preset='veryfast')
        .overwrite_output()
        .run(quiet=True)
    )
