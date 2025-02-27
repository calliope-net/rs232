
//% color=#002050 icon="\uf093" block="RS-232" weight=15
namespace rs232
/* 
    C16: fischertechnik Fototransistor 36134 mit Pull-Up Widerstand 100 k / Calliope v2
    C17: fischertechnik Lichtschranken-LED 9V 0.01A 162135
    oder
    P2: Fototransistor ohne Pull-Up Widerstand
    P1: Lichtschranken-LED
    Takt zwischen 2 Calliope: 20ms / zum BT Smart Controller: 400ms
    https://de.wikipedia.org/wiki/RS-232
    https://calliope-net.github.io/rs232-e41/
    https://calliope-net.github.io/rs232-e41/rs232.png
*/ {
    const i2cCardKb_x5F = 0x5F

    export let n_pinLED: DigitalPin = DigitalPin.P1
    export let n_pinFototransistor: AnalogPin = AnalogPin.P2 // dunkel~860 / hell~20 / Calliope v2
    export let n_valueFototransistor: number = 150
    export let n_takt_ms: number = 400 // Takt zwischen 2 Calliope: 20ms / zum BT Smart Controller: 400ms
    export let n_startBitTime: number = 0.5
    export let n_escape: boolean = false // warten auf Startbit beim Empfang abbrechen

    //% group="asynchrone serielle Datenübertragung mit Licht"
    //% block="Pins: LED %pinLED Fototransistor %pinFototransistor Helligkeit < %valueFototransistor" weight=5
    //% pinLED.defl=DigitalPin.P1 pinFototransistor.defl=AnalogPin.P2 valueFototransistor.defl=150
    export function setPins(pinLED: DigitalPin, pinFototransistor: AnalogPin, valueFototransistor: number) {
        n_pinLED = pinLED
        n_pinFototransistor = pinFototransistor
        n_valueFototransistor = valueFototransistor
    }

    //% group="asynchrone serielle Datenübertragung mit Licht"
    //% block="Takt: %pTakt_ms ms || startBitTime %startBitTime" weight=4
    //% pTakt_ms.defl=400
    //% startBitTime.defl=0.5
    export function setTakt(pTakt_ms: number, startBitTime = 0.5) {
        n_takt_ms = pTakt_ms
        n_startBitTime = startBitTime
    }





    // ========== group="Funktionen"

    //% group="Funktionen" advanced=true
    //% block="// %text" weight=6
    export function comment(text: string): void { }

    //% group="Funktionen" advanced=true
    //% block="%i0 zwischen %i1 und %i2" weight=4
    export function between(i0: number, i1: number, i2: number): boolean {
        return (i0 >= i1 && i0 <= i2)
    }


    //% group="Funktionen" advanced=true
    //% block="ASCII Code von M5Stack Card Keyboard (I²C: 0x5E)" weight=3
    export function readCardKeyboard() {
        let buffer = pins.i2cReadBuffer(i2cCardKb_x5F, 1)
        return buffer[0]
    }


} // rs232.ts
