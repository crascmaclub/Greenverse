import React, { useState } from 'react';

// --- QUAN TRỌNG: CÁCH DÙNG ẢNH TRONG PUBLIC ---
// Vì ảnh của bạn nằm ở public/, chúng ta dùng đường dẫn chuỗi trực tiếp.
// Đảm bảo các file này nằm ở: public/waterchar.png, v.v.
const CHARACTERS = [
  { id: 1, name: "Water Spirit", role: "Mage", avatar: "/waterchar.png", color: "#3498db" },
  { id: 2, name: "Fire Knight", role: "Warrior", avatar: "/firechar.png", color: "#e74c3c" },
  { id: 3, name: "Soil Golem", role: "Tanker", avatar: "/soilchar.png", color: "#795548" },
  { id: 4, name: "Air Ranger", role: "Rogue", avatar: "/gaschar.png", color: "#ab17c8" },
];

const ChooseChar = ({ onCharacterLock }) => {
  const [selected, setSelected] = useState(CHARACTERS[0]);
  const [nameInput, setNameInput] = useState("");

  const handleConfirm = () => {
    // Truyền cả nhân vật và tên người chơi nhập vào về App.js
    onCharacterLock(selected, nameInput || selected.name);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>CHOOSE YOUR HERO</h1>
      
      <div style={styles.inputGroup}>
        <input 
          type="text" 
          placeholder="ENTER NAME..." 
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          className="font-pixel"
          style={styles.input}
        />
      </div>

      <div style={styles.contentWrapper}>
        <div style={styles.roster}>
          {CHARACTERS.map((char) => (
            <div 
              key={char.id}
              onClick={() => setSelected(char)}
              style={{
                ...styles.card,
                borderColor: selected.id === char.id ? char.color : 'transparent',
                backgroundColor: selected.id === char.id ? '#333333' : '#1c8930'
              }}
            >
              <img src={char.avatar} alt={char.name} style={styles.smallAvatar} />
              <div>
                <h4 style={{margin: 0}}>{char.name}</h4>
                <small>{char.role}</small>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.details}>
          <img src={selected.avatar} alt="Large" style={{...styles.largeAvatar, borderColor: selected.color}} />
          <h2 style={{color: selected.color}}>{selected.name}</h2>
          <button onClick={handleConfirm} style={{...styles.btn, backgroundColor: selected.color}}>
            START
          </button>
        </div>
      </div>
    </div>
  );
};

// --- QUAN TRỌNG: PHẢI CÓ DÒNG NÀY ĐỂ HẾT LỖI "EXPORT DEFAULT" ---
export default ChooseChar;

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', backgroundColor: '#070807', color: 'white', padding: '20px' },
  header: { marginBottom: '20px' },
  fontFamily: '"Press Start 2P", cursive',
  inputGroup: { marginBottom: '20px' },
  input: { padding: '10px', fontSize: '1.2rem', backgroundColor: '#222', color: 'white', border: '2px solid #444', outline: 'none' },
  contentWrapper: { display: 'flex', width: '90%', maxWidth: '800px', backgroundColor: '#1a1a1a', borderRadius: '10px', overflow: 'hidden' },
  roster: { flex: 1, padding: '20px', borderRight: '1px solid #ab2c2c' },
  card: { display: 'flex', alignItems: 'center', padding: '10px', cursor: 'pointer', border: '2px solid transparent', marginBottom: '10px', borderRadius: '5px' },
  smallAvatar: { width: '40px', height: '40px', marginRight: '10px' },
  details: { flex: 1, padding: '30px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  largeAvatar: { width: '120px', height: '120px', border: '4px solid', borderRadius: '10px', marginBottom: '15px' },
  btn: { padding: '10px 20px', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer', marginTop: 'auto', width: '100%' }
};