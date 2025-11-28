import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

        <div className="prose prose-slate max-w-none">
          <p className="text-lg mb-6">Last Updated: March 20, 2025</p>

          <p className="mb-6">
            Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the UtilityHub
            website and mobile application (the "Service") operated by UtilityHub ("us", "we", or "our").
          </p>

          <p className="mb-6">
            Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
            These Terms apply to all visitors, users, and others who access or use the Service.
          </p>

          <p className="mb-6">
            By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the
            terms, then you may not access the Service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Accounts</h2>

          <p className="mb-4">
            When you create an account with us, you must provide information that is accurate, complete, and current at
            all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of
            your account on our Service.
          </p>

          <p className="mb-4">
            You are responsible for safeguarding the password that you use to access the Service and for any activities
            or actions under your password, whether your password is with our Service or a third-party service.
          </p>

          <p className="mb-4">
            You agree not to disclose your password to any third party. You must notify us immediately upon becoming
            aware of any breach of security or unauthorized use of your account.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Service Bookings</h2>

          <p className="mb-4">
            UtilityHub acts as a marketplace connecting users with service providers. We do not provide the services
            directly but facilitate the connection between users and service providers.
          </p>

          <p className="mb-4">
            By booking a service through our platform, you enter into a direct agreement with the service provider.
            While we vet our service providers, we cannot guarantee the quality, safety, or legality of services
            provided.
          </p>

          <p className="mb-4">
            You agree to provide accurate information when booking services, including your address, contact details,
            and service requirements. Failure to provide accurate information may result in service delays or
            cancellations.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Payments</h2>

          <p className="mb-4">
            All payments are processed securely through our payment partners. By making a payment, you agree to provide
            accurate billing information and authorize us to charge the specified amount.
          </p>

          <p className="mb-4">
            Service prices may vary based on factors including but not limited to demand, location, and service
            complexity. The final price will be displayed before you confirm your booking.
          </p>

          <p className="mb-4">
            Subscription plans are billed on a recurring basis. You can cancel your subscription at any time, and
            refunds will be provided on a prorated basis for the unused portion of your subscription period.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Cancellations and Refunds</h2>

          <p className="mb-4">
            You may cancel a booking up to 4 hours before the scheduled service time without any charges. Cancellations
            made within 4 hours of the scheduled time may incur a cancellation fee of 25% of the service cost.
          </p>

          <p className="mb-4">
            If a service provider cancels a booking, you will receive a full refund or the option to reschedule at no
            additional cost.
          </p>

          <p className="mb-4">
            If you are not satisfied with a service, you must report the issue within 24 hours of service completion. We
            will investigate and may offer a partial or full refund at our discretion.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Service Provider Terms</h2>

          <p className="mb-4">
            Service providers must provide accurate information during registration and maintain updated information
            throughout their use of the platform.
          </p>

          <p className="mb-4">
            Service providers agree to deliver services as described, at the agreed time and location, and to the best
            of their professional ability.
          </p>

          <p className="mb-4">
            UtilityHub charges a commission on each completed service booking. The commission rate will be clearly
            communicated during the registration process and may be updated with notice.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Intellectual Property</h2>

          <p className="mb-4">
            The Service and its original content, features, and functionality are and will remain the exclusive property
            of UtilityHub and its licensors. The Service is protected by copyright, trademark, and other laws.
          </p>

          <p className="mb-4">
            Our trademarks and trade dress may not be used in connection with any product or service without the prior
            written consent of UtilityHub.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Limitation of Liability</h2>

          <p className="mb-4">
            In no event shall UtilityHub, nor its directors, employees, partners, agents, suppliers, or affiliates, be
            liable for any indirect, incidental, special, consequential or punitive damages, including without
            limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to
            or use of or inability to access or use the Service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Changes</h2>

          <p className="mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
            material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
          </p>

          <p className="mb-4">
            By continuing to access or use our Service after those revisions become effective, you agree to be bound by
            the revised terms. If you do not agree to the new terms, please stop using the Service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">9. Contact Us</h2>

          <p className="mb-4">
            If you have any questions about these Terms, please{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
