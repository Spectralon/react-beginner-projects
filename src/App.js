import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [invites, setInvites] = React.useState([]);
  const [submit, setSubmit] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const [searchVal, setSearchVal] = React.useState('');

  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then(res => res.json())
      .then(json => {
        setUsers(json.data);
      }).catch(err => {
        console.warn(err);
        alert("Ошибка при получении списка пользователей!");
      }).finally(() => setLoading(false));
  }, []);

  const onChangeSearchVal = evt => {
    setSearchVal(evt.target.value);
  }

  const onClickInvite = id => {
    if (invites.includes(id))
      setInvites(prev => prev.filter(_id => _id != id));
    else
      setInvites(prev => [...prev, id]);
  }

  const onClickSend = () => {
    setSubmit(true);
  }

  return (
    <div className="App">
      {submit ? (
        <Success count={invites.length} />
      ) : (
        <Users
          onChangeSearchVal={onChangeSearchVal}
          searchVal={searchVal}
          items={users}
          isLoading={isLoading}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSend={onClickSend}
        />
      )}
    </div>
  );
}

export default App;
