async function testBlogsCRUD() {
  console.log("==================================================");
  console.log("TESTING BLOGS CRUD & FRONTEND VISIBILITY API...");
  console.log("==================================================");

  const BASE_URL = "http://localhost:3000";

  // 1. Login as Admin
  console.log("\n1. Logging in to admin session...");
  const loginRes = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "admin@blessedheartshca.com",
      password: "BlessedHearts2026!"
    })
  });

  const loginData = await loginRes.json();
  console.log("Login response:", loginData);

  const cookie = loginRes.headers.get("set-cookie") || "";
  console.log("Session cookie retrieved:", cookie ? "✓ Present" : "✗ Missing");

  // 2. Fetch all blogs
  console.log("\n2. Fetching all blogs via Admin API...");
  const getBlogsRes = await fetch(`${BASE_URL}/api/admin/blogs`, {
    headers: { Cookie: cookie }
  });
  const getBlogsData = await getBlogsRes.json();
  console.log(`✓ Total blogs count: ${getBlogsData.count}`);
  console.log("Sample blog title:", getBlogsData.blogs?.[0]?.title);

  // 3. Create a new test blog post
  const testSlug = `bhh-care-guide-test-${Date.now()}`;
  console.log(`\n3. Publishing test blog with slug: ${testSlug}...`);
  const createRes = await fetch(`${BASE_URL}/api/admin/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie
    },
    body: JSON.stringify({
      title: "Essential Caregiver Self-Care and Respite Guide",
      slug: testSlug,
      category: "Caregiver Tips",
      excerpt: "Proven strategies for family caregivers to prevent burnout, access respite care, and preserve mental health.",
      content: "Family caregiving is an act of deep love, but it also carries immense physical and emotional demands.\n\nTaking regular respite breaks allows caregivers to recharge and return with renewed patience and energy.\n\nBlessed Hearts Homecare provides compassionate respite support across Pennsylvania so families can rest with peace of mind.",
      author: "Blessed Hearts Care Specialists",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60",
      status: "published",
      date: "2026-09-26"
    })
  });
  const createData = await createRes.json();
  console.log("Create response:", createData);

  // 4. Update the test blog post
  console.log("\n4. Updating test blog post via PUT...");
  const updateRes = await fetch(`${BASE_URL}/api/admin/blogs`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie
    },
    body: JSON.stringify({
      id: testSlug,
      slug: testSlug,
      title: "Essential Caregiver Self-Care and Respite Guide [Updated]",
      category: "Respite Care",
      excerpt: "Updated proven strategies for family caregivers to prevent burnout and access respite care.",
      content: "Family caregiving is an act of deep love, but it also carries immense physical and emotional demands.\n\nTaking regular respite breaks allows caregivers to recharge and return with renewed patience and energy.\n\nBlessed Hearts Homecare provides compassionate respite support across Pennsylvania so families can rest with peace of mind.\n\nContact us today to arrange scheduled or emergency respite relief.",
      author: "Blessed Hearts Care Specialists",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=600&auto=format&fit=crop&q=60",
      status: "published",
      date: "2026-09-26"
    })
  });
  const updateData = await updateRes.json();
  console.log("Update response:", updateData);

  // 5. Test Frontend Visibility
  console.log(`\n5. Checking frontend route /blog/${testSlug}...`);
  const frontendRes = await fetch(`${BASE_URL}/blog/${testSlug}`);
  console.log("Frontend HTTP Status:", frontendRes.status);
  const html = await frontendRes.text();
  const titleFound = html.includes("Essential Caregiver Self-Care");
  const schemaFound = html.includes("@type\":\"Article\"") || html.includes("@type\": \"Article\"");
  console.log("Article Title in HTML:", titleFound ? "✓ Found" : "✗ Missing");
  console.log("Article Schema JSON-LD:", schemaFound ? "✓ Found" : "✗ Missing");

  // 6. Delete test blog post
  console.log(`\n6. Cleaning up test blog post (${testSlug})...`);
  const deleteRes = await fetch(`${BASE_URL}/api/admin/blogs`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie
    },
    body: JSON.stringify({ id: testSlug })
  });
  const deleteData = await deleteRes.json();
  console.log("Delete response:", deleteData);

  console.log("\n==================================================");
  console.log("BLOGS CRUD & FRONTEND TEST COMPLETE");
  console.log("==================================================");
}

testBlogsCRUD().catch(console.error);
