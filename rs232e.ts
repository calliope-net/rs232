
namespace rs232 /* rs232e.ts
 
 */ {



    // ========== group="Empfang"


    //% group="Empfang: 1 Startbit, 7 Datenbit, 1 Paritätsbit, 1 Stopbit"
    //% block="empfange Text || Ende-Zeichencode %endCode" weight=7
    //% endCode.defl=13
    export function empfangeText(endCode = 13): string {
        n_escape = false
        let text = ""
        let iAsc: number
        while (true) {
            iAsc = binToAsc(empfange10Bit())
            if (iAsc == endCode) {
                text += String.fromCharCode(iAsc)
                break
            }
            else if (iAsc == -1) {
                text += "|" + iAsc + "|"
                break
            }
            else {
                text += ascToChr(iAsc)
            }
        }
        return text
    }



    //% group="Empfang: 1 Startbit, 7 Datenbit, 1 Paritätsbit, 1 Stopbit"
    //% block="empfange 1 Zeichen (10-Bitarray)" weight=5
    export function empfange10Bit(): boolean[] {
        let iPause_ms: number
        let empfangeneBits: boolean[] = []

        while (!empfange1Bit()) { // auf Startbit warten (Licht an)
            iPause_ms = input.runningTime() + n_takt_ms * n_startBitTime // 0.5 oder 0.45
            if (n_escape)
                break
        }
        if (!n_escape) {

            // Startbit nach einer halben Taktzeit einlesen
            //  iPause_ms = input.runningTime() + iTakt_ms * 0.5
            for (let i = 0; i < 10; i++) {
                basic.pause(iPause_ms - input.runningTime())
                empfangeneBits.push(empfange1Bit()) // Lichtschranke abfragen
                iPause_ms += n_takt_ms // einen Takt warten, trifft das nächste Bit in der Mitte
            }
            return empfangeneBits
        }
        else {
            return []
        }
    }


    //% group="Empfang: 1 Bit (Fototransistor hell ist true)"
    //% block="empfange 1 Bit (analogReadPin)" weight=2
    export function empfange1Bit() {
        // hell ist true, analoger Wert < 150
        return pins.analogReadPin(n_pinFototransistor) < n_valueFototransistor
    }
















    //% group="Empfang: 1 Startbit, 7 Datenbit, 1 Paritätsbit, 1 Stopbit" advanced=true
    //% block="10-Bitarray → ASCII Code %bitArray" weight=4
    export function binToAsc(bitArray: boolean[]): number {
        let iDez = 0, iParity = 0, iFehler = 0
        let iExp = 1
        let bBit: boolean
        if (bitArray.length < 10) { // 10 Bit im Array boolean[]
            iFehler = -1
        }
        else {
            for (let i = 0; i <= 9; i++) {
                bBit = bitArray[i]          // aktuelles Bit lesen (negative Logik)
                if (i == 0 && !bBit) {     // [0] Start Bit false - muss true sein (Licht an-true = logisch 0)
                    iFehler = -2
                    break // for
                }
                else if (i >= 1 && i <= 7) { // [1]..[7] Daten Bits (Licht aus-false = logisch 1)
                    if (!bBit) {
                        iParity++ // Parity zählt (Licht aus-false = logisch 1)
                        iDez += iExp
                    }
                    iExp = iExp << 1 // um 1 Bit nach links schieben entspricht *2
                }
                else if (i == 8) {         // [8] Parity Bit
                    if (!bBit) { // Parity zählt (Licht aus-false = logisch 1)
                        iParity++
                    }
                    if (iParity % 2 != 0) { // ungerade Parität - Parity Error
                        iFehler = -3
                        break // for
                    }
                }
                else if (i == 9 && bBit) { // [9] Stop Bit true - muss false sein (Licht aus)
                    iFehler = -4
                    break // for
                }
            }
        }

        if (iFehler == 0)
            return iDez
        else
            return iFehler // -1 Array<10 | -2 Start | -3 Parity | -4 Stop
    }

    //% group="Empfang: 1 Startbit, 7 Datenbit, 1 Paritätsbit, 1 Stopbit" advanced=true
    //% block="ASCII Code → ASCII Zeichen %ascByte 32..127 \\|fehler\\|" weight=2
    export function ascToChr(ascByte: number) {
        if (between(ascByte, 32, 127))
            return String.fromCharCode(ascByte)
        else
            return "|" + ascByte + "|"
    }
} // rs232e.ts
