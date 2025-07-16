export const DEFAULT_APP_SETTINGS = {
  skin: "STANDARD",
  actionAfterSolve: "NONE",
  message: undefined,
  keysType: "NUMBERS",
  backgroundBefore: "images/standard/background_before.png",
  backgroundAfter: "images/standard/background_after.png",
  backgroundTimeMachine : "images/standard/background_time_machine.png",
  //backgroundDial: "images/standard/dial.png",
  //modeButton: "images/standard/mode_button.png",
  //backgroundNok: "images/standard/background_nok.png",
  //backgroundOk: "images/standard/background_ok.png",
  backgroundButton: "images/standard/button.png",
  backgroundMessage: "images/background_message.png",
  imageLightOff: "images/standard/light_off.png",
  imageLightNok: "images/standard/light_nok.png",
  imageLightOk: "images/standard/light_ok.png",
  soundBeep: "sounds/beep.mp3",
  soundNok: "sounds/solution_nok.mp3",
  soundOk: "sounds/solution_ok.mp3",
  soundDial: "sounds/spin.wav",

  soundAfterSolve: "sounds/after_solve.mp3",

  dialWidth: 0.7, // Relative size of the dial compared to the box width
  dialHeight: 0.7, // Relative size of the dial compared to the box height
  dialTextSize: "2.5vmin", // Font size for the dial text
  dialTextColor: "#000000", // Color for the dial text


  rayWidth: 0.59, // Relative width of the ray compared to the box width
  rayHeight: 0.6, // Relative height of the ray compared to the box height

  buttonWidth: 0.15, // Relative width of the button compared to the box width
  buttonHeight: 0.15, // Relative height of the button compared to the box height
  buttonMarginTop: 0.85, // Margin from the top of the box to the button in percentage of box height
  buttonMarginLeft: 0.8, // Margin from the left of the box to the button in percentage of box width


  screenContainerWidth: 0.543, // Width of the screen container
  screenContainerHeight: 0.543, // Height of the screen container
  screenContainerMarginTop: -0.256, // Margin from the top of the box to the screen container in percentage of box height


};

export const SKIN_SETTINGS_RETRO = {
  background: "images/retro/background.png",
  backgroundKeypad: "images/background_keypad_retro.png",
  backgroundKey: "images/background_key_retro.png",
  
  backgroundLock : "images/retro/background_lock_retro.png",
  backgroundDial: "images/retro/dial_retro.png",
  backgroundMessage: "images/background_message_retro.png",
  imageLightOff: "images/retro/light_off_retro.png",
  imageLightNok: "images/retro/light_nok_retro.png",
  imageLightOk: "images/retro/light_ok_retro.png",
  soundBeep: "sounds/beep_retro.wav",
  soundNok: "sounds/solution_nok_retro.wav",
  soundOk: "sounds/solution_ok_retro.wav",

  dialTextSize: "9vmin", // Font size for the dial text
  dialTextColor: "#FFFFFF", // Color for the dial text
  lightBack: "false"

};

export const SKIN_SETTINGS_FUTURISTIC = {
  background: "images/futuristic/background_futuristic.png",
  backgroundKeypad: "images/background_keypad_futuristic.png",
  backgroundKey: "images/background_key_futuristic.png",
  
  backgroundLock : "images/futuristic/background_lock_futuristic.png",
  backgroundDial: "images/futuristic/dial_futuristic.png",
  backgroundMessage: "images/background_message_futuristic.png",
  imageLightOff: "images/futuristic/light_off_futuristic.png",
  imageLightNok: "images/futuristic/light_nok_futuristic.png",
  imageLightOk: "images/futuristic/light_ok_futuristic.png",
  soundNok: "sounds/solution_nok_futuristic.wav",

  dialTextSize: "9vmin", // Font size for the dial text
  dialTextColor: "#0fbdfd", // Color for the dial text
  lightBack:"true", //Para controlar si se muestra la imagen tras el marco del dial
};

export const ESCAPP_CLIENT_SETTINGS = {
  imagesPath:"./images/",
};

export const MAIN_SCREEN = "MAIN_SCREEN";
export const MESSAGE_SCREEN = "MESSAGE_SCREEN";