import { dbConnect } from '../src/lib/mongodb.js';
import Portfolio from '../src/models/Portfolio.js';
import Credential from '../src/models/Credential.js';
import AccessLog from '../src/models/AccessLog.js';

async function seed() {
  await dbConnect();
  await Promise.all([
    Portfolio.deleteMany({}),
    Credential.deleteMany({}),
    AccessLog.deleteMany({}),
  ]);

  await Portfolio.create({
    portfolioId: 'AF-7421-ERIC-TH',
    officerName: 'Maj. Gen. Eric T. Hill',
    rank: 'Major General, USAF',
    accessCode: 'AF-7421-ERIC-TH',
    status: 'frozen',
    totalValue: 24785450,
    assets: { retirement: 6245750, investments: 11842300, realAssets: 4120600, other: 577800 },
    allocation: { equities: 45.2, retirement401k: 25.2, fixedIncome: 15.3, realEstate: 8.7, cashEquivalents: 5.6 },
    restriction: {
      authority: 'U.S. Government / State Dept.',
      effectiveDate: new Date('2025-03-15'),
      reviewDate: new Date('2026-03-15'),
      reason: 'Under Official Review',
      lockedActions: ['Withdrawal', 'Transfer', 'Disbursement', 'Beneficiary Change'],
    },
  });

  console.log('Seed complete.');
  process.exit(0);
}

seed();
