export enum CycleSegmentEnum {
  THROTTLE = 'THROTTLE', // acelerações positivas são geradas pelo pedal do acelerador, negativas por freio motor
  BRAKE = 'BRAKE', // acelerações positivas são geradas pelo pedal de acelerador, negativas por pedal do freio
  GRADIENT = 'GRADIENT', /// acelerações positivas são geradas por descidas, negativas são geradas por pedal do freio
}
