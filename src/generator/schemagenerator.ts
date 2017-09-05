
import { Schema, SchemaProperty } from './../schema/index';

export class SchemaGenerator {

    /**
     * Return an array of 
     * 
     * @param schema 
     */
    buildRequiredProperties(schema : Schema) : string[] {
        if(schema.getProperties().length > 0){
            // Required properties
            let requiredProperties : SchemaProperty[] = schema.getProperties().filter((p : SchemaProperty) => {
            return p.isRequired();
            });

            // Map required properties
            return requiredProperties.map((p : SchemaProperty) => {
                return p.getName();
            });
        }

        return [];
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

                if(p.getMinLength() != null){
                    property['minLength'] = p.getMinLength();
                }           

                if(p.getMaxLength() != null){
                    property['maxLength'] = p.getMaxLength();
                }
                break;
            case 'enum':                
                if(p.getEnum().length > 0){
                    property['enum'] = p.getEnum();                
                }
                break;
            case 'anyOf':
                delete property['type'];
                property['anyOf'] = this.buildSchemas(p.getAnyOf());
                break;
            case '$ref':
                delete property['type'];
                property['$ref'] = '#/definitions/'+p.getRef();
                break;
            case 'array':                
                property['items'] = this.buildProperty(p.getItems());                
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

    public buildSchemas(schemas : Schema[]){
        let self = this;
        let builtSchemas = schemas.map(function(schema : Schema){
            return self.build(schema);
        });
        //console.log("Built schemas!");
        //console.log(builtSchemas);
        return builtSchemas;
    }

    public buildDefinitions(schema : Schema){
        let self = this;
        let definitions : any = {};
        
        schema.getDefinitions().forEach((def : Schema) => {
            let schemaDefinition = self.build(def, true);
            delete schemaDefinition['id'];
            delete schemaDefinition['type'];    
            /*if(def.getId() == 'facebookLikes'){
                console.log("\n\nDEFINITION:");
                console.log(schemaDefinition);
                console.log("\n\n\n");
            }*/
            definitions[def.getId()] = schemaDefinition;
        });

        return definitions;
    }

    /**
     * Generates schema JSON
     * 
     * @param schema 
     */
    public build(schema : Schema, isSubSchema? : boolean) {
        let obj : any = {            
            "type"          : schema.getType()
        };

        if(!(typeof isSubSchema == 'boolean' && isSubSchema == true)){
            obj["$schema"] = "http://json-schema.org/draft-06/schema#";
        }

        if(schema.getId() != ""){
            obj['id'] = schema.getId();
        }

        if(schema.getDescription() != ''){
            obj['description'] = schema.getDescription();
        }
        
        if(schema.getProperties().length > 0){
            obj['required'] = this.buildRequiredProperties(schema);
            obj['properties'] = this.buildProperties(schema);        
        }

        if(schema.getDefinitions().length > 0){
            obj['definitions'] = this.buildDefinitions(schema); 
        }

        return obj;
    }
}