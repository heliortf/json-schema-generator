
export interface Property {
    /**
     * Type of the property. Can be:
     * 
     * string | array | object
     */
    type : string;

    /**
     * Indicates that the property is required
     */
    required : boolean;

    /**
     * List of references
     */
    oneOf? : any[]
}



export class Schema {
    /**
     * List of properties
     */
    properties : any;

    /**
     * List of required properties
     */
    required : string[];
}