
namespace rs232 /* rs232s.ts
 
 */ {


    // ========== group="Senden: 7 Datenbit, 1 Paritätsbit"


    //% group="Senden: 7 Datenbit, 1 Paritätsbit"
    //% block="sende 1 Bit %bit" weight=9
    export function sende1Bit(bit: boolean) {
        if (bit) {
            pins.digitalWritePin(n_pinLED, 1)
        } else {
            pins.digitalWritePin(n_pinLED, 0)
        }
        // basic.pause(iPause_ms - input.runningTime())
        // iPause_ms += iTakt_ms
    }

    //% group="Senden: 7 Datenbit, 1 Paritätsbit"
    //% block="sende 11 Bit %send8Bits" weight=8
    export function sende11Bit(send8Bit: boolean[]) {
        // Daten (in Variable sendBits) senden
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

    //% group="Senden: 7 Datenbit, 1 Paritätsbit"
    //% block="sende Text %text mit ENTER %mitCR" weight=7
    export function sendeText(text: string, mitCR: boolean) {
        for (let i = 0; i < text.length; i++) {
            sende11Bit(ascToBin(text.charCodeAt(i)))
        }
        if (mitCR)
            sende11Bit(ascToBin(13))
    }

    //% group="Senden: 7 Datenbit, 1 Paritätsbit"
    //% block="sende 1 Zeichen ASCII Code %asc" weight=6
    //% asc.min=32 asc.max=127 asc.defl=13
    export function sendeAsc(asc: number) {
        sende11Bit(ascToBin(asc))
    }



    //% group="Senden: 7 Datenbit, 1 Paritätsbit"
    //% block="ASCII Zeichen → 8-Bitarray text %text index %index" weight=5
    export function chrToBin(text: string, index: number): boolean[] {
        return ascToBin(text.charCodeAt(index))
    }

    //% group="Senden: 7 Datenbit, 1 Paritätsbit"
    //% block="ASCII Code → 8-Bitarray %ascByte" weight=4
    export function ascToBin(ascByte: number): boolean[] {
        let iParity = 0, bBit: boolean
        let bitArray: boolean[] = []
        for (let i = 0; i < 7; i++) {
            bBit = ascByte % 2 == 0 // gerade Zahl==0 - Bit=true (negative Logik)
            bitArray.push(bBit) // [0]..[6] 7 Bit
            if (bBit)
                iParity++
            ascByte = ascByte >> 1 // um 1 Bit nach rechts schieben
        }
        bitArray.push(iParity % 2 != 0) // [7] das 8. Bit Parity
        return bitArray
    }


    //% group="Senden: 7 Datenbit, 1 Paritätsbit"
    //% block="ASCII Zeichen → ASCII Code text %text index %index" weight=3
    export function chrToAsc(text: string, index: number): number {
        return text.charCodeAt(index)
    }



} // rs232s.ts
