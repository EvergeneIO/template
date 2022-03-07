import requests

client_id = "RQGu1vXpXJjB7OmoU2DbHby2qYvAMPaEjCFoet8z"
client_secret = "2Y01JyNMcwO2wAF8jcNbmzisYNrM1DbnWyiXWlZcd408T5TdzhJzJepvjF67j8BL7gng0Z5A7oJFSd3HHI2BMecCDKWE8Wafs1nL36mfTmd4MgQ5DWslEUpq8oEmV1vg"
payload = "grant_type=client_credentials&client_secret={0}&client_id={1}".format(client_secret, client_id)
headers = {
    'content-type': "application/x-www-form-urlencoded",
    'cache-control': "no-cache",
}
url = "https://api.smartplanapp.io/o/token/"
response = requests.request("POST", url, data=payload, headers=headers)
access_token = response.json()['access_token']



url = "https://api.smartplanapp.io/v2/accounts/UUID/"

payload = {'some': 'data'}

headers = {'content-type': 'application/json'}
    
r = requests.post(url, data=json.dumps(payload), headers=headers)

print(r.text)