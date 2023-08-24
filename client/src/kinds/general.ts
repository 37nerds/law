export type TOption = {
    name: string;
    value: string;
};

export type TLadderOption = {
    name: string[];
    value: string;
};

export type TBottomButton = {
    type: string;
    handler?: () => void;
};

/**
 * JSON Serializable Type
 *
 * we can convert this type into json string with JSON.stringify() method
 *
 * we can pass this type of data in the request payload body
 */
export type TJsonS =
    | string
    | number
    | boolean
    | null
    | TJsonS[]
    | {
          [key: string]: TJsonS;
      };
