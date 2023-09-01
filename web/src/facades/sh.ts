class StringHelper {
    private value: string;

    constructor(value: string) {
        this.value = value;
    }

    capitalize(): StringHelper {
        this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
        return this;
    }

    allCaps(): StringHelper {
        this.value = this.value.toUpperCase();
        return this;
    }

    addSuffix(suffix: string): StringHelper {
        this.value += suffix;
        return this;
    }

    removeWhitespace(): StringHelper {
        this.value = this.value.replace(/\s+/g, "");
        return this;
    }

    removeLastCharacter(): StringHelper {
        this.value = this.value.slice(0, -1);
        return this;
    }

    lastCharacter(): StringHelper {
        this.value = this.value.charAt(this.value.length - 1);
        return this;
    }

    valueOf(): string {
        return this.value;
    }

    toString(): string {
        return this.value;
    }
}

const sh = (value: string): StringHelper => {
    return new StringHelper(value);
};

export default sh;
