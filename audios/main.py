from pydub import AudioSegment

AudioSegment.from_mp3("input.mp3")[5000:15000].export("output.mp3", format="mp3")
