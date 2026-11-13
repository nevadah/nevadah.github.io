---
title: Senior Software Engineer
company: Big Fish Games, Inc.
start: 2022-01
end: 2025-10
summary: Promoted from Senior Software Design Engineer in Test to Senior Software Engineer after progressively taking on development responsibilities for the back-end web services that supported Big Fish’s mobile and downloadable games businesses.
---

I worked on several projects, the largest of which was the modernization of the Big Fish Games ecommerce platform. We transitioned it from an on-premises stack developed in-house to a managed cloud-based architecture built on Adobe Magento and Adobe Experience Manager. This substantially reduced our footprint in the local data center, enabled faster and easier deployments, improved monitoring capabilities, and eliminated PCI-compliance responsibilities.

My accomplishments in this role include:

- Integrated and customized multiple Magento extensions to support Big Fish Games business needs.
- Integrated Magento with Klaviyo, including extending the Klaviyo extension for Magento and implementing additional custom code. This replaced Salesforce and allowed Big Fish to better manage email marketing campaigns.
- Adapted Magento and the existing authentication service to work together using SAML SSO, including custom logic for post-login redirects.
- Performed the first service migration to Google Kubernetes Engine and the first database migration to Cloud SQL, then documented the procedures I’d used. Other engineers followed those procedures to migrate additional services and databases, with my support.
- Designed and implemented a containerized Cloud Run service that gave the new Magento platform access to legacy purchase and customer data without migrating it, so millions of customers kept access to more than a decade of purchase history, including the games they had bought. The service also processed telemetry events and published them to Google Pub/Sub.
- Updated the DRM back-end service used for activation of games, making code and database changes to improve stability, fix longstanding issues, and enable tighter integration with Magento.
- Diagnosed a production failure in which reward points granted at migration all shared one expiration date, so the email system tried to send so many expiration notices at once that its cron job had to be disabled. I planned and carried out the fix, spreading the expirations out over time so notifications could resume.
- Contributed to development of the AEM front end, including implementation of the order history and game library pages.
- Contributed to the cross-platform Game Manager client application, a hybrid of C++/Objective-C++ and HTML/JavaScript/CSS. I fixed bugs, removed deprecated functionality, and updated authentication flows on both Mac and Windows.

**Technologies used include:** Magento, Adobe Experience Manager, PHP, Java, Spring Boot, JavaScript, TypeScript, Xcode, MySQL/MariaDB, Google Cloud Platform, Klaviyo, Terraform, Docker, Composer, npm, Maven, GitHub Actions, New Relic, Google Cloud Logging.
