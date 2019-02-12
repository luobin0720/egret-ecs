class BitSet{
    private static LONG_MASK: number = 0x3f;
    private bits: number[];

    constructor(nbits: number = 64){
        Assert.isFalse(nbits < 0, "nbits不能为负");

        let length = nbits >> 6;
        if ((nbits & BitSet.LONG_MASK) != 0)
            length++;
        
        this.bits = new BitSet[length];
    }

    public isEmpty(): boolean{
        for (let i = this.bits.length - 1; i >= 0; i--) {
            if (this.bits[i] != 0)
                return false;
        }

        return true;
    }

    public nextSetBit(from: number): number{
        let offset = from >> 6;
        let mask = 1 << from;
        while (offset < this.bits.length) {
            let h: number = this.bits[offset];
            do{
                if ((h & mask) != 0)
                    return from;
                mask <<= 1;
                from++;
            } while (mask != 0);

            mask = 1;
            offset++;
        }
    }

    public get(pos: number): boolean{
        let offset = pos >> 6;
        if (offset >= this.bits.length)
            return false;

        return (this.bits[offset] & (1 << pos)) != 0;
    }

    public intersects(set: BitSet): boolean{
        let i = Math.min(this.bits.length, set.bits.length);
        while (--i >= 0){
            if ((this.bits[i] & set.bits[i]) != 0)
                return true;
        }

        return false;
    }
}