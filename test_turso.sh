#!/bin/bash
curl -X POST "https://dpolg-cleaning-maxwellbadger-1.aws-eu-west-1.turso.io/v2/pipeline" \
  -H "Authorization: Bearer eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NTk4NDI1MzcsImlkIjoiZjY1ZWY2YzMtYWNhMS00NjZiLWExYjgtODU0MTlmYjlmNDNiIiwicmlkIjoiMTRjNDc4YjAtYTAwMy00ZmZmLThiYTUtYTZhOWIwYjZiODdmIn0.JSyu72rlp3pQ_vFxozglKoV-XMHW12j_hVfhTKjbEGwSyWnWBq2kziJNx2WwvvwD09NU-TMoLLszq2Mm9OlLDw" \
  -H "Content-Type: application/json" \
  -d '{
    "requests": [
      {
        "type": "execute",
        "stmt": {
          "sql": "SELECT date, room_name, guest_name, extras, checkin_time FROM cleaning_tasks ORDER BY room_name, date LIMIT 3"
        }
      },
      {
        "type": "close",
        "stmt": {"sql": ""}
      }
    ]
  }' | python3 -m json.tool
