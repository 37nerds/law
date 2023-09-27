class StringChan {
    private value: string;

    constructor(value: string) {
        this.value = value;
    }

    capitalize(): StringChan {
        this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
        return this;
    }

    allCaps(): StringChan {
        this.value = this.value.toUpperCase();
        return this;
    }

    addSuffix(suffix: string): StringChan {
        this.value += suffix;
        return this;
    }

    removeWhitespace(): StringChan {
        this.value = this.value.replace(/\s+/g, "");
        return this;
    }

    removeLastCharacter(): StringChan {
        this.value = this.value.slice(0, -1);
        return this;
    }

    lastCharacter(): StringChan {
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

export const sc = (value: string): StringChan => {
    return new StringChan(value);
};

export const convertUsernameLogic = (text: string) => {
    return text[0] !== "@" ? `@${text}` : text;
};

export const prepareErrorString = (errors: string[]): string => {
    return errors?.reduce((s, c) => s + " | " + c);
};

export const isEmail = (text: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(text);
};

export const generateUsernameFromEmail = (email: string) => {
    return "@" + (email.split("@")[0]?.toLowerCase() || "");
};

export const generateNameFromEmail = (email: string) => {
    const name = generateUsernameFromEmail(email);

    if (name.length == 1) {
        return "";
    }

    if (name.length == 2) {
        return name[1].toUpperCase();
    }

    return name[1].toUpperCase() + name.slice(2);
};
