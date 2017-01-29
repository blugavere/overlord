
# Queen Service

## Spawn Broodlings

Messaging Example

Run one instance of Hydralisk with two instances of Queen, hit the /3001/spawn/:id route and 
watch the queens divide up the work, broadcasting the results which background will pick up on.


## RPC Call

When recieving an RPC call, queen receieved a message, processes it, and sends the response to the replyTo param.


- no queen nodes running, requests to hydra
- multiple queen nodes running, requests to hydra
- no queen nodes running, requests to hydra, take down hydra