import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry


session = requests.Session()
retry = Retry(connect=3, backoff_factor=0.5)
adapter = HTTPAdapter(max_retries=retry)
session.mount('http://', adapter)
session.mount('https://', adapter)

print('Testing this URL : http://172.31.31.28:9000//api/expenses?firstDay=2022-04-20&lastDay=2022-05-04' )

x = requests.get('http://172.31.31.28:9000//api/expenses?firstDay=2022-04-20&lastDay=2022-05-04')
assert 200 == x.status_code
print('Response Status : '  + str(x.status_code))


print('Testing this URL : http://172.31.31.28:9000/auth/signin' )

myobj = {'email': 'Anuj.rautela@iiitb.ac.in', 'password' : 'anuj2014'}

x = requests.post('http://172.31.31.28:9000/auth/signin', json=myobj)
assert 200 == x.status_code
print('Response Status : '  + str(x.status_code))



print('Testing this URL : http://172.31.31.28:9000//api/users/' )

x = requests.get('http://172.31.31.28:9000//api/users/')
assert 200 == x.status_code

print('Response Status : '  + str(x.status_code))

