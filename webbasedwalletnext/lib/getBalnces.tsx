export const getSoBalance = async (publicKey: string|null):Promise<number|null> => {
    if(!publicKey) return null
    console.log("pybkey",publicKey)
    const apiUrl = process.env.NEXT_PUBLIC_SolAlmechyApi;
    console.log("api url",apiUrl)
    const body = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "getBalance",
        "params": [
            publicKey
        ]
    }
    if (apiUrl) {
        const response = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(body)
        })
        const data = await response.json()
        console.log(data)
        if(data){
            return (data.result.value / 1000000000)
        }else{
            return null
        }
    }
    return null
}