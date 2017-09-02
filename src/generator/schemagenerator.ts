
import { Schema, SchemaProperty } from './../schema/index';

export class SchemaGenerator {

    /**
     * Return an array of 
     * 
     * @param schema 
     */
    buildRequiredProperties(schema : Schema) : string[] {
        // Required properties
        let requiredProperties : SchemaProperty[] = schema.getProperties().filter((p : SchemaProperty) => {
           return p.isRequired()
        });

        // Map required properties
        return requiredProperties.map((p : SchemaProperty) => {
            return p.getName();
        });
    }

    /**
     * Build property
     * 
     * @param p 
     */
    buildProperty(p : SchemaProperty) {
        let property : any = {
            'type'      : p.getType()
        };

        switch(p.getType()){
            case 'object':
                break;
            case 'string':
                
                if(p.getFormat() != ""){
                    property['format'] = p.getFormat()
                }                
                break;
            case 'enum':                
                property['enum'] = p.getEnum();                
                break;
        }

        return property;
    }

    /**
     * Build the list of properties
     * 
     * @param schema 
     */
    buildProperties(schema : Schema) {
        let self = this;
        let properties : any = {};
        
        // Loop through properties
        schema.getProperties().forEach((p : SchemaProperty) => {
            properties[p.getName()] = self.buildProperty(p);
        });

        return properties;
    }

    /**
     * Generates schema JSON
     * 
     * @param schema 
     */
    public build(schema : Schema) {
        let obj : any = {
            "$schema"       : "http://json-schema.org/draft-06/schema#",
            "id"            : schema.getId(),
            "description"   : schema.getDescription(),
            "type"          : schema.getType()
        };

        
        obj['required'] = this.buildRequiredProperties(schema);
        obj['properties'] = this.buildProperties(schema);        

        return obj;
    }
}