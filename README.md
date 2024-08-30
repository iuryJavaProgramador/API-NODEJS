
Para realizar este projeto, Utilizei o nodejs versão 20, e typescript.
Testes no postman

Resposta http, response body:

// http://localhost:3333/api/images
Status code = 200  - Operação realizada com sucesso
{ “customer_code”: string, “measures”: [ { “measure_uuid”: string, “measure_datetime”: datetime, “measure_type”: string, “has_confirmed”:boolean, “image_url”: string }, { “measure_uuid”: string, “measure_datetime”: datetime, “measure_type”: string, “has_confirmed”:boolean, “image_url”: string } ] }


// http://localhost:3333/api/images?scenario=invalid_type
Status code =  400  -  Parâmetro measure type diferente de WATER ou GAS
{ "error_code": "INVALID_TYPE", "error_description": “Tipo de medição não permitida” }


// http://localhost:3333/api/images?scenario=not_found
Status code =  404 - Nenhum registro encontrado
{ "error_code": "MEASURES_NOT_FOUND", "error_description": "Nenhuma leitura encontrada" }`

