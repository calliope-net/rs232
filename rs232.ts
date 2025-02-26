
//% color=#002050 icon="\uf093" block="RS-232" weight=15
namespace rs232
/* 
    https://de.wikipedia.org/wiki/RS-232
    https://calliope-net.github.io/rs232-e41/
    https://calliope-net.github.io/rs232-e41/rs232.png
*/ {

    export let n_pinLED: DigitalPin = DigitalPin.C17
    export let n_pinFototransistor: AnalogPin = AnalogPin.C16
    export let n_valueFototransistor: number = 150
    export let n_takt_ms: number = 400
    export let n_startBitTime: number = 0.5
    export let n_escape: boolean = false // warten auf Startbit beim Empfang abbrechen

    //% group="asynchrone serielle Datenübertragung mit Licht"
    //% block="Pins: LED %pinLED Fototransistor %pinFototransistor Helligkeit < %valueFototransistor" weight=5
    //% pinLED.defl=DigitalPin.C17 pinFototransistor.defl=AnalogPin.C16 valueFototransistor.defl=150
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
} // rs232.ts
