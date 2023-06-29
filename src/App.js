const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

// App component
function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        <AddFriendForm />
        <Button>Add friend</Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

// List of friends component
function FriendsList() {
  // firends
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

// Friend component
function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even.</p>}
      <Button>Select</Button>
    </li>
  );
}

// Add friend form component
function AddFriendForm() {
  return (
    <form className="form-add-friend">
      <label>Friend name</label>
      <input type="text"></input>

      <label>Image URL</label>
      <input type="text"></input>

      <Button>Add</Button>
    </form>
  );
}

// form split bill component
function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>Bill Amount</label>
      <input type="text"></input>

      <label>Your Bill</label>
      <input type="text"></input>

      <label>Friend Bill</label>
      <input type="text" disabled></input>

      <label>Who is paying the bill?</label>
      <select>
        <option value="user"></option>
        <option value="friend">X</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}

// reusable Button component
function Button({ children }) {
  return <button className="button">{children}</button>;
}

export default App;
