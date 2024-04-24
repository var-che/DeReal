# Deno + Surreal starting kit

The goal of this project is to be a GOTO repo for building apps with Deno and
SurrealDB. As little fluff to he project, the better.

### Usage

1. Start the SurrealDB with:

```
surreal start  --user root --pass root --bind 0.0.0.0:8008 memory
```

2. Run the following schema as the root user:

```
DEFINE TABLE user SCHEMAFULL
	PERMISSIONS
		FOR select, update, delete WHERE id = $auth.id;

DEFINE FIELD email ON user TYPE string ASSERT string::is::email($value);
DEFINE FIELD password ON user TYPE string;

DEFINE INDEX email ON user FIELDS email UNIQUE;

DEFINE SCOPE user SESSION 1d
	SIGNIN (
		SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(password, $password)
	)
	SIGNUP (
		CREATE user CONTENT {
			email: $email,
			password: crypto::argon2::generate($password)
		}
	);
```

3. Make sure to install Deno:
   https://deno.land/manual/getting_started/installation

4. Then start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.
