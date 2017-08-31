

export class SchemaProperty {
    /**
     * Name of the property
     */
    name : string;

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
     * Array of valid strings
     */
    enum : string[];    

    /**
     * List of references
     */
    oneOf : any[]

    /**
     * Regex string
     */
    pattern : string;


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