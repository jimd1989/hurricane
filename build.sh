#!/bin/sh

cat "src/constants.ts" > hurricane.ts
cat "src/html.ts" >> hurricane.ts
cat "src/img.ts" >> hurricane.ts
cat "src/team.ts" >> hurricane.ts
cat "src/tile.ts" >> hurricane.ts
cat "src/main.ts" >> hurricane.ts
tsc --strict --noUnusedLocals --noUnusedParameters --removeComments hurricane.ts
rm hurricane.ts
