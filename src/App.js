import { useState } from "react";

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

// reusable Button component
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

// App component
function App() {
  // friends
  const [friends, setFriends] = useState(initialFriends);

  // form display state
  const [showAddFriend, setShowAddFriend] = useState(false);

  // selected friend state
  const [selectedFriend, setSelectedFriend] = useState(null);

  // Button onClick state
  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  // add friend
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    // close form after adding a friend
    setShowAddFriend(false);
  }

  // selection handle
  function handleSelection(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((currentSelected) =>
      currentSelected?.id === friend.id ? null : friend
    );
    // close add friend
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <AddFriendForm onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}

// List of friends component
function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

// Friend component
function Friend({ friend, onSelection, selectedFriend }) {
  // compare selected friend from current
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
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
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

// Add friend form component
function AddFriendForm({ onAddFriend }) {
  const [name, setName] = useState();
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=499476");

  function handleSubmit(event) {
    // prevent page reload on form submission
    event.preventDefault();

    // if no name or image don't submit
    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    console.log(newFriend);
    // add friend to current state
    onAddFriend(newFriend);

    // reset to base state
    setName("");
    setImage("https://i.pravatar.cc/48?u=499476");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      ></input>

      <label>Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(event) => setImage(event.target.value)}
      ></input>

      <Button>Add</Button>
    </form>
  );
}

// form split bill component
function FormSplitBill({ selectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>Bill Amount</label>
      <input type="text"></input>

      <label>Your Bill</label>
      <input type="text"></input>

      <label>{selectedFriend.name}'s Bill</label>
      <input type="text" disabled></input>

      <label>Who is paying the bill?</label>
      <select>
        <option value="user"></option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}

export default App;
