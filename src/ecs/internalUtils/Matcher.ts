class Matcher{
    private allSet: BitSet = new BitSet();
    private exclusionSet: BitSet = new BitSet();
    private oneSet: BitSet = new BitSet();

    constructor(){}

    public getAllSet(): BitSet{
        return this.allSet;
    }

    public getExclusionSet(): BitSet{
        return this.exclusionSet;
    }

    public getOneSet(): BitSet{
        return this.oneSet;
    }

    public isInterested(e: Entity): boolean{
        return this.isInterestedR(e.componentBits);
    }

    public isInterestedR(componentBits: BitSet): boolean{
        if (!this.allSet.isEmpty()){
            for (let i = this.allSet.nextSetBit(0); i >= 0; i = this.allSet.nextSetBit(i + 1)) { 
                if (!componentBits.get(i))
                    return false;
            }
        }

        if (!this.exclusionSet.isEmpty() && this.exclusionSet.intersects(componentBits))
            return false;

        if (!this.oneSet.isEmpty() && !this.oneSet.intersects(componentBits))
            return false;

        return true;
    }

    public static empty(): Matcher{
        return new Matcher();
    }
}