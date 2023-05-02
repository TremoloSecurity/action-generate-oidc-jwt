# Generate OpenID Connect JWT Action

This action will generate a JWT for a custom audience.  It replaces a script like:

```yaml
- name: get oidc token
  run: |
    OIDC_TOKEN=$(curl -sLS "${ACTIONS_ID_TOKEN_REQUEST_URL}&audience=cicd.tremolo.dev" -H "User-Agent: actions/oidc-client" -H "Authorization: Bearer $ACTIONS_ID_TOKEN_REQUEST_TOKEN")
    JWT=$(echo $OIDC_TOKEN | jq -j '.value')
    echo "JWT=$JWT" >> $GITHUB_ENV
```

In addition to creating the JWT for your audience, it registers the JWT as a GitHub action secret to reduce the risk that it is leaked via logs.

## Inputs

### `audience`

The value of the JWT `aud` claim.  This audience should be validated by the receiver of the token.

### `environmentVariableName`

The name of the environment variable to store the generated JWT into.  This environment variable is marked as a secret.

## Outputs

There are no outputs.

## Example usage

```yaml
- name: get oidc token
  uses: tremolosecurity/action-generate-oidc-jwt@v1.0
  with:
    audience: "cicd.tremolo.dev"
    environmentVariableName: "JWT"
```

