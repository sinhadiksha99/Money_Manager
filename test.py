import requests
print('Testing this URL : http://52.90.150.143:9000//api/expenses?firstDay=2022-04-20&lastDay=2022-05-04' )

x = requests.get('http://52.90.150.143:9000//api/expenses?firstDay=2022-04-20&lastDay=2022-05-04')
assert 200 == x.status_code
print('Response Status : '  + str(x.status_code))
