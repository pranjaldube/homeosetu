import Link from "next/link";

export default function ReleaseNotesPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          HomeoSetu WebApp Release Notes
        </h1>

        <div className="space-y-6 text-lg">
          <div>
            <p className="font-semibold">WebApp Version 1.0.0</p>
            <p className="text-muted-foreground">
              Release Date – 19 March 2026
            </p>
          </div>

          <p className="italic">
            Homeosetu WebApp <br />
            An Application By the Everyday Homeopath for the Everyday Homeopath…
          </p>

          <div className="flex flex-col space-y-1">
            <h2 className="text-2xl font-semibold mt-8 mb-4">How to use</h2>
            <Link
              href="https://www.homeosetu.com/courses/bfe073ca-221a-473d-b77d-e205adfe9a21"
              target="_blank"
              className="text-blue-600 hover:underline w-fit"
            >
              Video 1 - How to use Homeosetu Clinical repertory
            </Link>
            <Link
              href="https://www.homeosetu.com/courses/85f7526c-c37d-49f9-8e99-6c85d37e3e8b"
              target="_blank"
              className="text-blue-600 hover:underline w-fit"
            >
              Video 2 - How to use Kent repertory
            </Link>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Overview</h2>
          <p>
            As goes our name HomeoSetu – We would like to be the bridge between
            academic subjects and clinical practice for the homeopath.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            1. There are Homeopathic Tools –
          </h3>

          <div className="pl-4 md:pl-8 space-y-6">
            <div>
              <h4 className="font-medium mb-2">a. Basic Repertories Like</h4>
              <ul className="list-[lower-roman] pl-6 space-y-2">
                <li>
                  Kent Repertory with Patient Versions (added by Dr Alpesh Oza)
                </li>
                <li>Allen’s Fever Repertory</li>
                <li>Homeosetu Bowel Nosode Repertory</li>
                <li>
                  Homeosetu Repertory to Keynotes and Characteristics of MM by
                  Dr Allen
                </li>
                <li>Homeosetu Clinical Repertory</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">b. HomeoSetu Lens:</h4>
              <p className="pl-6">
                Integration of MM in various areas of the WebApp (click on Each
                Rubric or Remedy for Descriptions)
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">
                c. Homeosetu Intelligence Clinic Assistant
              </h4>
              <ul className="list-[lower-roman] pl-6 space-y-2">
                <li>
                  For Quick Replies / search for clinical condition, causes,
                  investigations to do, Remedy Relationship search, Remedy
                  Validation tools and much More
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">New Features</h2>
          <p>
            Homeopaths can add their patient versions in the mind section of
            each rubric of kent repertory. And use the search option to search
            for those words / notes entered.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Ongoing Enhancements
          </h2>

          <h3 className="text-xl font-medium mt-6 mb-2">Patient Versions</h3>
          <p>
            New Patient Versions curated by Dr. Oza are being added every week.
            These updates will automatically appear in the app and in our
            release notes as they go live.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-2">Repertory Expansion</h3>
          <p>
            Repertories such as Keynotes and the Clinical Repertory are actively
            being expanded by our team on a daily basis. New entries and
            refinements will continue to roll out regularly within the app and
            in our documentation.
          </p>

          <p>
            Patient‑level saving and synchronization are not available in this
            initial release. We are actively developing a secure patient‑save
            feature and native mobile apps to enable seamless saving, syncing,
            and retrieval of repertorisations. Until these capabilities are
            released, you may capture screenshots of your repertorisation and
            store them in your preferred patient record system
          </p>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
            <p className="mb-4">
              We are building the Application keeping each Homeopath and his
              Practice in our mind and heart. <br />
              Your Support, Suggestions will matter a lot.
            </p>
            <p className="font-semibold">Lets Build the Future together.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
