import Content, { HeaderBlock, HeaderSection } from 'components/Content'

export default function About() {
  return (
    <Content>
      <HeaderSection>
        <HeaderBlock
          preTitle='About Brewbean'
          title='A story of coffee & code'
        />
      </HeaderSection>
      <div className='mt-6 prose prose-indigo prose-md text-gray-700 mx-auto'>
        <h2>Why we created this</h2>
        <p>
          Since you're here on our site, I assume you like coffee. We enjoy
          coffee a lot, but we especially like making it. Like many coffee
          ethusiasts, we initially found it very overwhelming to get into
          coffee. Of course, we all knew of the mass market brands you find in
          your grocery store or the national chains, but how should we go about
          making excellent coffee at home?
        </p>
        <p>
          After perusing many forums, blog articles, and videos, we found ways
          to make coffee that we love. However, we think this process is both
          slow and less than ideal. We think that the coffee world's internet
          presence is abysmal compared to how pervasive it is throughout
          everyday life. Our goal is to be able to get all the best ideas from
          hobbyists and professionals alike on what their favorite recipes and
          beans are. That way we can make the journey for a new lover of coffee
          much more pleasant, and who knows, maybe show an old lover of coffee
          some new ideas and cool roasters out there.
        </p>
        <h2>We love code</h2>
        <p>
          To be fair, we don't always enjoying coding for our day jobs, but when
          it comes to a passion project like this, coding is amazing! We get to
          think about all the interesting ways that technology can be used to
          make coffee making, buying, and learning more pleasant. One example is
          our integrated recipe player with the recipes on our site. A lot of us
          have struggled to initially follow recipes for pour-overs because they
          involve both a stopwatch, scale, and recipe on hand. Our hope with the
          recipe player is that we can simplify this experience so that you'll
          be more inclined to try out new recipes all the time.
        </p>
        <p>
          It's hard to say now at the beginning stages, but we truly believe we
          can create some amazing innovations leveraging technology and cool
          projects from the industry. Such future ideas include integrating with
          smart scales and coffee machines. Truly the opportunities are endless.
          Like we mentioned before, the coffee world's presence on the internet
          and technology for that matter has been abysmal.
        </p>
        <h2>What we want to provide</h2>
        <p>
          One of the main things we want to do is democratize coffee more. What
          does that mean? Well due to traditional market physics, most of the
          coffee brands you know are major players in the industry. Chances are
          you have a fixed amount of coffee you buy every week or whatever
          interval you choose so just by nature of decision fatigue you aren't
          hunting for a cool brand all the time. This is natural, but it's also
          why small coffee roasters and cafes often struggle. Especially in the
          times of COVID-19, cafes and small roasters are needing to shift to an
          online market. Without a large marketing budget and plan, many
          struggle to shift their efforts online.
        </p>
        <p>
          Let's be clear here, this is largely a talk related to marketing and
          business, but for us consumers, this says little about the best
          product we can get. That's really the kicker: We're often buying the
          beans we know rather than the beans we think are best &mdash;{' '}
          <em>
            unless you are the special enthusiast constantly in search of new
            beans.
          </em>{' '}
          By creating a platform that allows people to review coffee beans from
          any roaster big and small, we hope we can make it more fair to help
          the small roasters and ultimately help the best roasters who may not
          be getting the exposure they deserve.
        </p>
        <h2>Our roadmap</h2>
        <p>
          Currently we are able to share recipes created by any user in our
          community. Some big features in work include:
          <ul>
            <li>
              The ability to add coffee beans and their reviews to an easily
              searchable catalog.
            </li>
            <li>
              Store pages: mini-wiki pages for cafes and roasters to share their
              stories.
            </li>
            <li>
              Marketplace: a storefront where we hope to sell the best beans on
              our site. This is a major place where we hope to be able to
              promote smaller businesses.
            </li>
          </ul>
        </p>
        <p>
          Interested in collaborating?{' '}
          <a href='mailto:info@brewbean.io'>Let's chat</a>.
        </p>

        <p>
          <em>Written on February 19, 2021</em>
        </p>
      </div>
    </Content>
  )
}
