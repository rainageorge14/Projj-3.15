# Dorm Marketplace PRD

## 1. Scope Cut

### Feature 1: Online Payments

Online payment integration is excluded from the Day 1 MVP because secure payment gateways, refunds, and transaction handling add major backend complexity beyond core marketplace validation.

### Feature 2: Live Chat Between Buyers and Sellers

Live chat is excluded because messaging systems increase technical scope and are not essential for validating the primary listing and claim workflow.

### Feature 3: Advanced Search and Filters

Advanced search, category filtering, and sorting are excluded because the initial MVP only needs basic item discovery to prove product usefulness.

---

## 2. MVP Features

### Feature 1: Item Listing

Students can create marketplace listings with item name, optional description, and free/price information.

### Feature 2: Claim Item Workflow

Students can browse available items and claim an item for in-person handoff.

### Feature 3: Item State Protection

The system manages listing states correctly, including:

- Available
- Claimed
- Claim Expired
- Sold
- Removed

This ensures protection against double claims, abandoned claims, and seller-side overrides.

---

## 3. Acceptance Criteria (Claim Item Flow)

### Acceptance Criteria 1

**Given** an item is currently available  
**When** a student clicks the Claim Item button  
**Then** the item status becomes Claimed and is locked from other buyers.

---

### Acceptance Criteria 2

**Given** an item has already been claimed by another student  
**When** a second student attempts to claim the same item  
**Then** the system prevents the claim and displays that the item is no longer available.

---

### Acceptance Criteria 3

**Given** a claimed item is not confirmed for pickup before the expiration timer ends  
**When** the claim timeout occurs  
**Then** the claim is automatically canceled and the item returns to Available status.
Final submission branch for Kalvium capstone.