#include <bits/stdc++.h>
using namespace std;

int main() {
    int N;
    cin>>N;

    vector<char> arr(N);
    for(int i=0;i<N;i++) {
        cin>>arr[i];
    }

    unordered_map<int,int> mp;
    int sum=0,maxlength=0;

    for(int i=0;i<N;i++) {
        if(arr[i]=='P')
            sum+=1;
        else
            sum-=1;

        if(sum==0)
            maxlength=i+1;

        if(mp.find(sum)!=mp.end())
            maxlength= max(maxlength, i - mp[sum]);
        else
            mp[sum] = i;
    }

    cout<<maxlength;
    return 0;
}
