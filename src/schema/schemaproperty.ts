

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

    constructor(params? : any){
        this.required = false;
        this.enum = [];
        this.oneOf = [];
        this.type = "";

        if(typeof params != 'undefined'){
            if(typeof params['name'] == 'string' && params['name'] != ''){
                this.setName(params['name']);
            }
        }
    }

    setName(name : string){
        this.name = name;
    }

    getName(){
        return this.name;
    }

    setType(type : string){
        this.type = type;
    }
    
    getType(){
        return this.type;
    }

    setRequired(required : boolean){
        this.required = required;
    }

    isRequired(){
        return this.required;
    }
}