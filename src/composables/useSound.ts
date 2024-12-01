import { Howl } from 'howler'

const sounds = {
  click: new Howl({ src: ['https://www.soundjay.com/buttons/button-37a.mp3'] }),
  win: new Howl({ src: ['https://www.soundjay.com/human/applause-01.mp3'] }),
  draw: new Howl({ src: ['https://www.soundjay.com/human/burp-1.mp3'] }),
  unlock: new Howl({ src: ['https://www.soundjay.com/buttons/button-8.mp3'] })
}

export function useSound() {
  const playSound = (sound: keyof typeof sounds) => {
    sounds[sound].play()
  }

  return {
    playSound
  }
}