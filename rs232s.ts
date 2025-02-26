
namespace rs232 /* rs232s.ts
 
 */ {


    // ========== group="Senden: 7 Datenbit, 1 Paritätsbit"



    //% group="7 Bit ASCII Zeichen senden"
    //% block="sende Text %text || Ende-Zeichencode %endCode" weight=8
    //% endCode.defl=13
    export function sendeText(text: string, endCode = 13) {
        for (let i = 0; i < text.length; i++) {
            sende11Bit(ascToBin(text.charCodeAt(i)))
        }
        if (endCode > 0)
            sende11Bit(ascToBin(endCode))
    }



    //% group="7 Bit ASCII Zeichen senden"
    //% block="sende 1 Zeichen ASCII Code %asc" weight=7
    //% asc.min=32 asc.max=127 asc.defl=13
    export function sendeAsc(asc: number) {
        sende11Bit(ascToBin(asc))
    }



    //% group="7 Bit ASCII Zeichen senden"
    //% block="sende 1 Zeichen aus Text %text Index %index" weight=6
    export function sendeChr(text: string, index: number) {
        sende11Bit(ascToBin(text.charCodeAt(index)))
    }



    //% group="7 Bit ASCII Zeichen senden"
    //% block="Zeichencode aus Text %text Index %index" weight=3
    export function chrToAsc(text: string, index: number): number {
        return text.charCodeAt(index)
    }



    // ========== group="Senden: 7 Datenbit, 1 Paritätsbit" advanced=true


    //% group="Senden: 7 Datenbit, 1 Paritätsbit" advanced=true
    //% block="sende 1-Startbit %send8Bit 2-Stopbit" weight=5
    //% send8Bit.shadow=rs232_ascToBin
    export function sende11Bit(send8Bit: boolean[]) {
        let iPause_ms = input.runningTime() + n_takt_ms

        sende1Bit(true) // Startbit - Licht an
        basic.pause(iPause_ms - input.runningTime())
        iPause_ms += n_takt_ms

        for (let i = 0; i <= 7; i++) {
            sende1Bit(send8Bit[i]) // 7 Datenbits + 1 Paritätsbit
            basic.pause(iPause_ms - input.runningTime())
            iPause_ms += n_takt_ms
        }
        sende1Bit(false) // 2 Stopbit - Licht aus
        basic.pause(iPause_ms - input.runningTime())
        iPause_ms += n_takt_ms

        sende1Bit(false)
        basic.pause(iPause_ms - input.runningTime())
        iPause_ms += n_takt_ms

    }



    //% blockId=rs232_ascToBin
    //% group="Senden: 7 Datenbit, 1 Paritätsbit" advanced=true
    //% block="8-Bitarray aus ASCII Code %asc" weight=4
    //% asc.min=32 asc.max=127 asc.defl=13
    export function ascToBin(asc: number): boolean[] {
        let iParity = 0, bBit: boolean
        let bitArray: boolean[] = []
        for (let i = 0; i < 7; i++) {
            bBit = asc % 2 == 0 // gerade Zahl==0 - Bit=true (negative Logik)
            bitArray.push(bBit) // [0]..[6] 7 Bit
            if (bBit)
                iParity++
            asc = asc >> 1 // um 1 Bit nach rechts schieben
        }
        bitArray.push(iParity % 2 != 0) // [7] das 8. Bit Parity
        return bitArray
    }


  
    //% group="Senden: 7 Datenbit, 1 Paritätsbit" advanced=true
    //% block="8-Bitarray aus Text %text Index %index" weight=3
    export function chrToBin(text: string, index: number): boolean[] { // →
        return ascToBin(text.charCodeAt(index))
    }


    //% group="Senden: 7 Datenbit, 1 Paritätsbit" advanced=true
    //% block="sende 1 Bit: LED %bit (digitalWritePin)" weight=1
    //% bit.shadow=toggleOnOff
    export function sende1Bit(bit: boolean) {
        if (bit)
            pins.digitalWritePin(n_pinLED, 1)
        else
            pins.digitalWritePin(n_pinLED, 0)
    }



} // rs232s.ts
