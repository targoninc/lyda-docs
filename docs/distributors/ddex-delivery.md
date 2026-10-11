# DDEX delivery

Distributors and labels can deliver catalogs to Lyda as DDEX ERN packages over HTTPS. A delivery creates private
releases and tracks that can be imported into an artist's catalog after review, exactly like a manual upload.

## Supported standard

| Item | Supported |
| --- | --- |
| Message | `NewReleaseMessage` (Release-based) |
| Version | ERN 4.3 and ERN 4.3.1 (`http://ddex.net/xml/ern/43`, `http://ddex.net/xml/ern/431`) |
| Resources | `SoundRecording` (audio) and `Image` (cover art) |
| Acknowledgement | ERN Choreography for Web Services (`AcknowledgementMessage`, `http://ddex.net/xml/ern-c-ws/18`) |

`TrackRelease` deliveries, videos, text and other resource types are rejected with an actionable error. Deals are not
enforced; territory codes, commercial models and use types are stored with the delivery for review.

## Sending a delivery

`POST /deliveries/ddex` with `Authorization: Bearer <token>`. Tokens are issued by Lyda per delivery account and map
the catalog to that account.

Two package layouts are accepted:

1. A zip file in the `package` multipart field containing the ERN XML (one `.xml` file) and all referenced audio and
   artwork files. Resource `URI` values in the XML are resolved against the files inside the zip (exact paths or file
   names).
2. An `xml` field (the ERN message) plus one or more `resources` files whose file names match the `URI` values.

Audio and artwork must be part of the package. Remote URLs are not fetched, and SFTP polling is not supported; use
the HTTPS endpoint.

```bash
curl -X POST https://api.lyda.app/deliveries/ddex \
  -H "Authorization: Bearer $DDEX_TOKEN" \
  -F "package=@catalog.zip"
```

### Required fields

- `MessageHeader`: `MessageId`, `MessageSender/PartyId`, `MessageCreatedDateTime`.
- Every `Release`: `ReleaseReference`, a title, and either a `ReleaseId/ICPN` (UPC) or ISRCs on its tracks.
- Every `SoundRecording`: `ResourceReference`, a title, and an audio file (`TechnicalDetails/DeliveryFile/File/URI`).
- Every referenced resource reference must exist in `ResourceList`.

`TestMessage` deliveries are validated but not imported.

## Acknowledgements

Accepted deliveries and duplicates return the DDEX acknowledgement XML (`200 OK`,
`Content-Type: application/xml`), with one `ReleaseStatus` per release using
`SuccessfullyIngestedByReleaseDistributor`.

Rejected packages return `422` and failed imports return `500` with a JSON body:

```json
{
  "status": "rejected",
  "errors": ["MessageHeader/MessageId is required."],
  "acknowledgement": ""
}
```

Invalid packages are never partially imported. If a failure occurs while importing, all records created by the
delivery are rolled back.

## Idempotency

A delivery is identified by `MessageSender/PartyId` plus `MessageId`. Re-sending the same message returns the stored
acknowledgement and does not import anything again. Releases and tracks are additionally matched by UPC and ISRC
(falling back to title), so re-delivering a catalog under a new `MessageId` updates the existing records instead of
duplicating them.

## Visibility and rights

Ingested catalogs are always created with `private` visibility and no monetization until they are reviewed. Label
names, P/C lines, territories, commercial models and use types are recorded on the delivery in the internal
dashboard. Contributors are stored on the track (credits) and linked to Lyda accounts when the party name matches a
user.

Deliveries are logged and visible to Lyda staff in the deliveries tab of the internal dashboard.
