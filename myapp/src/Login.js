// Login.js
import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const body = new URLSearchParams({
      grant_type: "password",
      username,
      password,
      client_id: "hFr6I5PMMT2Lu1xkYcXXHa55utzuqfhgTazEgQbp",
      client_secret: "FI2X5zx3Ajmrib9GZVRQICF4vximiv3LTfvOivIt5j7ewagg4Q8Vczo5oE3eydQq5WldxwGLDDjn4ZmfenNGc1oIMsDoseiW1u8xtrpuUvgkvAwruGCMqWHFEDx3f4FC"
    });

    try {
      // Lấy token
      const tokenRes = await fetch("http://127.0.0.1:8000/o/token/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString()
      });
      const tokenData = await tokenRes.json();
      const accessToken = tokenData.access_token;

      // Lấy thông tin user + role
      const userRes = await fetch("http://127.0.0.1:8000/api/user-info/", {
        headers: { "Authorization": "Bearer " + accessToken }
      });
      const userData = await userRes.json();

      setResult({ ...userData, token: accessToken });
    } catch (err) {
      console.error(err);
      setResult({ success: false, error: "Cannot connect to server" });
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>

      {result && (
        <div>
          {result.error ? (
            <p style={{ color: "red" }}>{result.error}</p>
          ) : (
            <p>Welcome {result.username}, role: {result.role}, token: {result.token}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Login;
