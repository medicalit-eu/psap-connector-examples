import express from 'express';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { randomUUID } from 'crypto';

const app = express();
const port = Number.parseInt(process.env.PORT ?? '3000', 10);
const issuer = 'https://identity.ng-sos.com/';

app.use(express.json());

let jwks;

const getJwks = async () => {
  if (jwks) {
    return jwks;
  }

  const configUrl = new URL('.well-known/openid-configuration', issuer);
  const response = await fetch(configUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch OpenID configuration: ${response.status}`);
  }
  const config = await response.json();
  jwks = createRemoteJWKSet(new URL(config.jwks_uri));
  return jwks;
};

const unauthorized = (res) => {
  res.status(401).json({
    title: 'Unauthorized',
    status: 401,
    detail: 'Bearer token is missing or invalid.'
  });
};

const authenticate = async (req, res, next) => {
  const header = req.header('authorization');
  if (!header || !header.startsWith('Bearer ')) {
    unauthorized(res);
    return;
  }

  const token = header.slice('Bearer '.length).trim();
  if (!token) {
    unauthorized(res);
    return;
  }

  try {
    await jwtVerify(token, await getJwks(), { issuer });
    next();
  } catch (error) {
    console.warn('Token verification failed:', error?.message ?? error);
    unauthorized(res);
  }
};

app.get('/about', authenticate, (req, res) => {
  res.json({
    version: '2.0.0',
    supportsIncidentCreate: true,
    supportsIncidentUpdatePosition: true,
    supportsIncidentReplacePosition: true,
    supportsIncidentAddRegion: true,
    supportsIncidentAddActivatedEmergencyService: false,
    supportsIncidentUpdateInternetConnectionType: true,
    supportsIncidentUpdateBatteryLevel: true,
    supportedAppTypes: ['Mobile', 'Web', 'IOT'],
    supportedInternetConnectionTypes: ['Unknown', 'WiFi', 'G2', 'G3', 'G4', 'G5'],
    supportedDeviceOs: ['Unknown', 'iOS', 'Android', 'WindowsPhone'],
    supportedGender: ['Unknown', 'Male', 'Female', 'Other'],
    supportedEmergencyServiceTypes: [
      'EmergencyMedicalService',
      'FireRescueServices',
      'Police',
      'MountainRescueService',
      'WaterRescueService',
      'CoastGuard'
    ],
    allowsMonitoring: true
  });
});

app.post('/v2/incident', authenticate, (req, res) => {
  const incidentId = req.body?.id ?? randomUUID();
  console.log(`incident ${incidentId} created.`);
  res.status(201).json(incidentId);
});

app.post('/v2/incident/:id', authenticate, (req, res) => {
  console.log(`incident ${req.params.id} closed.`);
  res.sendStatus(200);
});

app.post('/v2/incident/:id/region', authenticate, (req, res) => {
  console.log(`incident ${req.params.id} region updated. PSAP ${JSON.stringify(req.body?.psap ?? null)}.`);
  res.sendStatus(200);
});

app.post('/v2/incident/:id/position', authenticate, (req, res) => {
  console.log(`incident ${req.params.id} position updated. New position ${JSON.stringify(req.body?.position ?? null)}.`);
  res.sendStatus(200);
});

app.put('/v2/incident/:id/position', authenticate, (req, res) => {
  console.log(`incident ${req.params.id} position replaced. New position ${JSON.stringify(req.body?.position ?? null)}.`);
  res.sendStatus(200);
});

app.patch('/v2/incident/:id/battery-level', authenticate, (req, res) => {
  console.log(`incident ${req.params.id} battery level updated. New battery level ${req.body?.batteryLevel ?? null}.`);
  res.sendStatus(200);
});

app.patch('/v2/incident/:id/internet-connection-type', authenticate, (req, res) => {
  console.log(
    `incident ${req.params.id} internet connection type updated. New connection ${req.body?.internetConnectionType ?? null}.`
  );
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`PSAP connector listening on port ${port}.`);
});
